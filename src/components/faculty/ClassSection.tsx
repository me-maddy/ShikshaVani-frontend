import React, { useState } from "react";
import SubjectSection from "./SubjectSection";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ClassData } from "../../types";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

interface ClassSectionProps {
  classData: ClassData;
}

const ClassSection: React.FC<ClassSectionProps> = ({ classData }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="mb-10">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="border border-transparent bg-purple-50 rounded-lg transition-all duration-200"
      >
        <CollapsibleTrigger className="w-full text-left cursor-pointer">
          <h2 className="text-2xl font-bold px-4 py-3 text-faculty-darkPurple border-b flex items-center justify-between">
            <span>{classData.class}</span>
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-purple-500 transition-transform duration-200" />
            ) : (
              <ChevronRight className="h-5 w-5 text-purple-500 transition-transform duration-200" />
            )}
          </h2>
        </CollapsibleTrigger>
        <CollapsibleContent className="animate-accordion-down">
          <div className="px-4 py-2">
            {classData.subjects.map((subject) => (
              <SubjectSection key={subject.id} subject={subject} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </section>
  );
};

export default ClassSection;
