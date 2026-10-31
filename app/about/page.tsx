import SkillCard from "@/components/SkillCard";

export default function AboutPage() {
  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900">About Me</h1>

      <div className="prose text-slate-700 space-y-4 text-lg">
        <p>
          Hello! I am Guinter Chissengue, a Software Development student at BYU-Pathway. I enjoy solving problems and creating efficient, user-friendly web applications.
        </p>
        <p>
          Right now I am learning full-stack development with Next.js, and my goal is to build complete, accessible applications from the front end to the back end.
        </p>
      </div>

      <div className="pt-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">My Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SkillCard
            title="Frontend Development"
            skills={["HTML & CSS", "JavaScript", "React & Next.js", "Tailwind CSS"]}
          />
          <SkillCard
            title="Tools & Environment"
            skills={["Git & GitHub", "VS Code", "Vercel Deployment"]}
          />
        </div>
      </div>
    </div>
  );
}