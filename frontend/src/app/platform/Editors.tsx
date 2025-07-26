import Image from "next/image";
const Editors = () => {
  const editors = [
    {
      name: "Akash De Silva",
      role: "Buildathon Lead",
      image: "",
    },
    {
      name: "Ometh Abeyrathne",
      role: "Algothan Lead",
      image: "",
    },
    {
      name: "Yasiru Dharmathilaka",
      role: "Vice President",
      image: "",
    },
    { name: "Mandinu Balasooriya", role: "President", image: "" },
    { name: "Ranudi Kariyapperuma", role: "Treasurer", image: "" },
  ];
  return (
    <div className="grid grid-cols-4 gap-4 p-40">
      {editors.map((editor, index) => (
        <div
          key={index}
          className={`p-4 text-3xl relative border-2 ${
            index % 2 === 0 ? "text-black" : "bg-black text-white"
          }`}
        >
          <div>{editor.name}</div>
          <div>Role: {editor.role}</div>
          {editor.image && (
            <Image
              src={editor.image}
              alt={editor.name}
              height={100}
              width={100}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Editors;
