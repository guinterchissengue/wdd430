import ProjectList from "@/components/ProjectList";

const projects = [
  {
    title: "TechSphere",
    description:
      "A multi-page online electronics store with product search, filters, cart, wishlist, product comparison, checkout and live currency conversion.",
    technologies: ["HTML", "CSS", "JavaScript", "Font Awesome", "localStorage"],
    link: "https://github.com/guinterchissengue/wdd330/tree/44c78974f4af33e7944b435ce2bf2be60fc725e3/project",
  },
  {
    title: "Student Study Resources",
    description:
      "A responsive website that helps students improve their study habits with practical tips and resources loaded from a JSON file, plus a contact form and modal dialogs.",
    technologies: ["HTML", "CSS", "JavaScript", "JSON", "Google Fonts"],
    link: "https://github.com/guinterchissengue/wdd231/tree/ac7e694847187078aeb82845eb72cf3b512d8fd8/project",
  },
];

export default function Home() {
  return (
    <section>
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
        <p className="text-lg text-slate-700">
          I&apos;m a software development student learning Next.js and React.
          Here are some of my recent projects.
        </p>
      </div>
      <ProjectList projects={projects} />
    </section>
  );
}