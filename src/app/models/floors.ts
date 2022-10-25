export class Floors {
    floorData?: FloorData
}

export class FloorData {
    floor?: number
    areas?: AreaData[]
}

export class AreaData {
    name?: string
    checklists?: string[]
}
