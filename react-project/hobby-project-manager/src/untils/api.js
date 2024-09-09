// פונקציות לעבודה עם API
export async function fetchHobbies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hobbies`);
  const data = await res.json();
  return data;
}

export async function fetchProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
  const data = await res.json();
  return data;
}
