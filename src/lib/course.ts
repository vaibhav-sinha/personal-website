import { getCollection, type CollectionEntry } from "astro:content";
import { flattenNav, rlCourseNav } from "../data/rl-course-nav";

export type RlCourseLesson = CollectionEntry<"rl-course">;

export async function getOrderedLessons(): Promise<RlCourseLesson[]> {
  const collection = await getCollection("rl-course", ({ data }) => !data.draft);
  const lessonMap = new Map(collection.map((lesson) => [lesson.id, lesson]));

  const ordered: RlCourseLesson[] = [];
  for (const item of flattenNav(rlCourseNav)) {
    const lesson = lessonMap.get(item.slug);
    if (lesson) ordered.push(lesson);
  }

  return ordered;
}

export function getPrevNext(
  lessons: RlCourseLesson[],
  currentSlug: string,
): { prev: RlCourseLesson | null; next: RlCourseLesson | null } {
  const index = lessons.findIndex((lesson) => lesson.id === currentSlug);
  if (index === -1) return { prev: null, next: null };

  return {
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}

export function getFirstLessonSlug(): string | null {
  const firstSection = rlCourseNav[0];
  return firstSection?.items[0]?.slug ?? null;
}
