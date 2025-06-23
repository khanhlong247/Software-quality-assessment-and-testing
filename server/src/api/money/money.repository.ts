import db from "../configs/database";
export interface QueryOptions {
  orderBy?: string;
  orderDir?: "asc" | "desc";
  limit?: number;
  offset?: number;
}
export type ReportLevel = "teacher" | "faculty" | "school";

export interface ReportOptions {
  level: ReportLevel;
  year?: number;
  orderBy?: string;
  orderDir?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export class MoneyRepository {
  async reportByLevel(options: ReportOptions) {
    const { level, year, orderBy, orderDir, limit, offset } = options;
    const [{ money }] = await db("credit").select("money").where({ id: 1 });

    const query = db("classes as c")
      .join("teachers as t", "c.teacher_id", "t.id")
      .join("courses as cou", "c.course_id", "cou.id")
      .join("semesters as s", "c.semester_id", "s.id")
      .join("degrees as d", "t.degree_id", "d.id");

    if (level === "teacher") {
      query
        .join("users as u", "t.user_id", "u.id")
        .select(
          "t.id as teacher_id",
          "u.full_name as teacher_name",
          "s.start_year as year",
          db.raw(
            "SUM(cou.total_hour * (cou.coefficient + c.grade) * d.salary_grade * ?) as total_salary",
            [money]
          ),
          db.raw("COUNT(c.id) as total_classes")
        )
        .groupBy("t.id", "u.full_name", "s.start_year");
    }

    if (level === "faculty") {
      query
        .join("faculty as f", "t.faculty_id", "f.id")
        .select(
          "f.id as faculty_id",
          "f.full_name as faculty_name",
          "s.start_year as year",
          db.raw(
            "SUM(cou.total_hour * (cou.coefficient + c.grade) * d.salary_grade * ?) as total_salary",
            [money]
          ),
          db.raw("COUNT(c.id) as total_classes")
        )
        .groupBy("f.id", "f.full_name", "s.start_year");
    }

    if (level === "school") {
      query
        .select(
          "s.start_year as year",
          db.raw(
            "SUM(cou.total_hour * (cou.coefficient + c.grade) * d.salary_grade * ?) as total_salary",
            [money]
          ),
          db.raw("COUNT(c.id) as total_classes")
        )
        .groupBy("s.start_year");
    }

    if (year) {
      query.where("s.start_year", year);
    }

    if (orderBy) {
      query.orderBy(orderBy, orderDir || "asc");
    }

    if (limit !== undefined) query.limit(limit);
    if (offset !== undefined) query.offset(offset);

    return query;
  }

}
