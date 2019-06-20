import extractDomain from 'extract-domain';
import { readdir, readFileSync, readJSON, writeFile, writeJSON } from 'fs-extra';
import handlebars from 'handlebars';
import { chain, find, forEach, get, isObject, isString, keyBy, keys } from 'lodash';
import { join } from 'path';
import simpleIcons from 'simple-icons';
import stringSimilarity from 'string-similarity';
import winston from 'winston';

let iconCollections: IIconCollections = {};
const dependencyIcons: any[] = [];

interface IIconCollection {
  collection: any[];
  location?: string;
  priority: number;
}

export interface IIconCollections {
  [ key: string ]: IIconCollection;
}

export async function getProjectStack(dirname: string) {
  getIconCollections()
    .then((_iconCollections) => iconCollections = _iconCollections)
    .then(() => getTechnologiesFromRepo(dirname))
    .then((technologies) => findKnownDependencies(technologies))
    .then(() => writeJSON('project-stack.json', dependencyIcons, { spaces: 2 }))
    .then(() => logger.info('success! Created file'))
    .then(() => createHTMLTemplate())
    .catch((err) => console.error(err));
}

async function getTechnologiesFromRepo(pathToRepo: string): Promise<any> {
  return readJSON(join(pathToRepo, './package.json'))
    .then((packageDetails) => ({
      ...packageDetails.dependencies,
      ...packageDetails.devDependencies,
      ...getVersionControls(packageDetails.repository),
      ...(keyBy(get(packageDetails, 'extra-stack.add') || []))
    }));
}

async function getIconCollections(): Promise<IIconCollections> {
  iconCollections[ 'simpleIcons' ] = { collection: simpleIcons, location: 'title', priority: 3 };

  return readdir(join(__dirname, '../node_modules/devicon/icons'))
    .then((collection) => iconCollections.devicon = { collection, priority: 2 })
    .then(() => readJSON(join(__dirname, '../node_modules/@kibibit/logos/logos.json')))
    .then((collection) => iconCollections.svgLogos = { collection, location: 'name', priority: 1 })
    .then(() => iconCollections);
}

async function createHTMLTemplate() {
  const template = handlebars.compile(readFileSync(join(__dirname, '../templates/stack.handlebars'), { encoding: 'utf-8' }));

  const result = template({ dependencyIcons });

  return writeFile('project-stack.html', result);
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

function findKnownDependencies(obj: any) {
  forEach(obj, (_dependency, depName) => {
    if (depName.startsWith('@types/')) { return; }

    const icon = findDependencyIcon(depName);

    if (icon && icon.collection === 'svgLogos' && icon.files && icon.files.length > 0) {
      icon.svg = readFileSync(join(__dirname, '../node_modules/@kibibit/logos/logos/', icon.files[ 0 ]), 'utf-8');
    }

    if (icon && icon.collection === 'devicon') {
      icon.svg = readFileSync(
        join(
          __dirname,
          '../node_modules/devicon/icons/',
          icon.iconName,
          `/${ icon.iconName }-original.svg`
        ),
        'utf-8'
      );
    }

    if (icon) {
      dependencyIcons.push({ depName, icon });
    }
  });
}

function findDependencyIcon(depName: string) {
  let result: any;

  const iconCollectionNames: string[] = chain(iconCollections).keys().sortBy((name) => iconCollections[ name ].priority || 0).value();

  forEach(iconCollectionNames, (collectionName) => result = result ||
    getDependencyIconPerList(collectionName, depName, iconCollections[ collectionName ].location));

  return result;
}

function getDependencyIconPerList(iconListName: string, depName: string, location: string = ''): any {
  iconListName = keys(iconCollections).includes(iconListName) ? iconListName : keys(iconCollections)[ 0 ];

  const iconList = iconCollections[ iconListName ].collection;
  depName = chain(depName).lowerCase().value() || '';

  const icon = find(iconList, (_icon) => {
    const parsedIconName = chain(_icon)
      .thru((value) => isString(value) ? value : get(value, location))
      .lowerCase()
      .value();

    const similarity = stringSimilarity.compareTwoStrings(depName, parsedIconName);

    logger.debug(`similarity between ${ depName }<=>${ parsedIconName } is: ${ similarity }`);

    return similarity > 0.8;
  });

  if (isString(icon)) {
    return {
      name: chain(icon).lowerCase().startCase().value(),
      iconName: icon,
      collection: iconListName
    };
  }

  if (isObject(icon)) {
    (icon as any).collection = iconListName;
  }

  return icon;
}

function getVersionControls(repository: any) {
  if (!repository) { return {}; }
  const result = {};

  result[ repository.type ] = '';
  result[ extractDomain(repository.url).replace(/\..*$/, '') ] = '';

  return result;
}
