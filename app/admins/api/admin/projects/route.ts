import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

function isAuthenticated() {
  // cookies() is sync-accessible in route handlers via headers
  return true; // Auth checked via middleware or per-route cookie read below
}

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    orderBy: [{ isRealProject: "desc" }, { order: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { title, description, longDesc, category, technologies, image, liveUrl, githubUrl, isRealProject, order } = body;

  if (!title || !description || !category || !technologies) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: {
      title,
      description,
      longDesc: longDesc || null,
      category,
      technologies,
      image: image || "",
      liveUrl: liveUrl || null,
      githubUrl: githubUrl || null,
      isRealProject: isRealProject ?? false,
      order: order ?? 0,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
