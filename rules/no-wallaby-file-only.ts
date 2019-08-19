const messages = {
    noFileOnly: `wallaby comments are not allowed ('//file.only')`
};

export default {
    name: 'no-wallaby-file-only',
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
            Program() {
                const comments = context.getSourceCode().getAllComments();
                const commentsWithFileOnly = comments.filter(comment => comment.value.includes('file.only'));
                if (commentsWithFileOnly.length > 0) {
                    context.report(commentsWithFileOnly[0], messages.noFileOnly);
                }
            }
        }
    }
};
