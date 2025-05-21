
import { Member } from "@/types/member";
import MemberCard from "./MemberCard";

interface MemberListProps {
  members: Member[];
  renewMembership: (id: string, days?: number) => void;
  showOnlyExpiring?: boolean;
}

const MemberList = ({ members, renewMembership, showOnlyExpiring = false }: MemberListProps) => {
  if (members.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl shadow-sm">
        <p className="text-[#8E9196]">
          {showOnlyExpiring 
            ? "No memberships are expiring soon." 
            : "No members found. Add your first member!"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {members.map((member) => (
        <MemberCard 
          key={member.id} 
          member={member} 
          renewMembership={renewMembership} 
        />
      ))}
    </div>
  );
};

export default MemberList;
