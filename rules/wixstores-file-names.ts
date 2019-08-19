import * as path from "path";

function isUpperCase(str: string): boolean {
    return str === str.toUpperCase();
}

function isPascalCased(name: string): boolean {
    return isUpperCase(name[0]) && !name.includes('_') && !name.includes('-');
}

function isLowerCase(str: string): boolean {
    return str === str.toLowerCase();
}

function isCamelCased(name: string): boolean {
    return isLowerCase(name[0]) && !name.includes('_') && !name.includes('-');
}

const messages = {
    reactComp: 'react components file names should be PascalCase',
    filesRelatedToReactComp:
        'non component files inside the component folder should be either camelCase or PascalCase',
    testkit: 'testkits file names should end with ".testKit"',
    camelCase: 'file names should be camelCase',
    classFiles: 'class files should be PascalCase',
};

export default {
    name: 'wixstores-file-names',
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Enforce wixstores file names convention',
            category: 'Stylistic Issues',
            recommended: 'error',
        },
        schema: [],
        messages
    },
    create(context) {
        return {
            Program(node): void {
                const fileNameAndPath = path.resolve(context.getFilename()) + context.getFilename();
                const extname = path.extname(fileNameAndPath);
                const dirname = path.dirname(fileNameAndPath);
                const fileName = path.basename(fileNameAndPath);

                if (extname === '.tsx' && dirname.includes('/components')) {
                    if (!isPascalCased(fileName)) {
                        context.report(node, messages.reactComp);
                    }
                    return;
                }


                if (extname === '.ts' && dirname.includes('/components')) {
                    if (!isPascalCased(fileName) && !isCamelCased(fileName)) {
                        context.report(node, messages.filesRelatedToReactComp);

                    }
                    return;
                }

                if (
                    /testkit\./i.exec(fileName) !== null &&
                    !fileName.includes('.testKit.')
                ) {
                    context.report(node, messages.testkit);
                }

                const fileNameWithoutExt = fileName.replace(extname, '');
                if (
                    context.getSource()
                        .toLowerCase()
                        .includes(`class ${fileNameWithoutExt.toLowerCase().replace('.', '')}`)
                ) {
                    if (!isPascalCased(fileName)) {
                        context.report(node, messages.classFiles);
                    } else {
                        return;
                    }
                }

                if (
                    fileName.includes('.spec') &&
                    (isPascalCased(fileName) || isCamelCased(fileName))
                ) {
                    return;
                }

                if (!isCamelCased(fileName)) {
                    context.report(node, messages.camelCase);
                }
            }

        }
    }
};
