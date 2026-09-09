export type Nest<Prefix extends string, Children extends string> =
    Prefix | `${Prefix}.${Children}`;