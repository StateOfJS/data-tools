import { isString } from 'lodash'

export interface CleanupConfig {
    fields: string[]
}

/**
 * Defines value which should be considered as undefined
 */
const emptyValues = [
    '',
    '\n',
    '\n\n',
    '/',
    '\\',
    '*',
    '+',
    '-',
    '—',
    'n/a',
    'N/A',
    'N/a',
    'NA',
    'Na',
    'na',
    'None',
    'none',
    'NONE',
    'Nope',
    'nope',
    'Nothing',
    'no',
    'No',
    'NO',
    'No.',
    '\nNo',
    '.',
    '?',
    '??',
    '???',
    '????',
    'huh?',
    '…',
    '...',
    '--',
    `'`,
    'undefined',
    'meh'
]

/**
 * This transformer removes values which should
 * be considered as undefined.
 */
export const createCleanupTransformer = (options: CleanupConfig) => {
    return {
        transform: (data: any[]) => {
            return data.map((item: any) => {
                let value = item.value
                if (!options.fields.includes(item.id) || !isString(value)) {
                    return item
                }

                value = value.trim()
                if (emptyValues.includes(value)) {
                    value = undefined
                }

                return { ...item, value, rawValue: item.value }
            })
        }
    }
}
