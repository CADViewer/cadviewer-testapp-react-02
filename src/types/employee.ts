export interface Employee {
    id:              number;
    room_id:         number;
    employee_number: number;
    phone:           string;
    floor_id:        number;
    org2_id:         number;
    firstname:       string;
    lastname:        string;
    employeeName:    string;
    department:      Department;
}

export interface Department {
    id:       number;
    name:     string;
    color_id: number;
    color:    string;
}

