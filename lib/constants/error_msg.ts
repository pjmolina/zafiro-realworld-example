export const ERROR_MSG = {
    entity_modules_must_have_a_default_export: (path: string) => {
        return `Entity modules must have a default entity_modules_must_have_a_default_export! ${path}`
    },
    cannot_read_path: (path: string) => {
        return `Cannot read path! ${path}`
    }
};
