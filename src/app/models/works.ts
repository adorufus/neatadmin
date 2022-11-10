import { Timestamp } from "firebase/firestore"

export class Works {
    data?: WorkData
}

export class WorkData {
    area_detail?: {}
    floor_cleaned?: number
    pic?: string
    work_finished_time?: Timestamp
    work_start_time?: Timestamp
    proof_image?: string[]
}

export class AreaDetail {
    completed_task?: CompletedTask
}

export class CompletedTask {
    area_name?: string
    done?: number
    total_task?: number
    percentage?: number
}
