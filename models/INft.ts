
export type Trait = "attack" | "health" | "speed";

export interface NftAttributes {
    trait_type : Trait,
    value: string
}

export interface INft {
    description: string,
    image: string,
    name: string
    attributes: NftAttributes[]
}