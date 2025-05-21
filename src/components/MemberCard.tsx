
import { useState } from "react";
import { Member } from "@/types/member";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatDate, daysRemaining } from "@/utils/dateUtils";
import { User, Phone, Calendar, DollarSign } from "lucide-react";

interface MemberCardProps {
  member: Member;
  renewMembership: (id: string, days?: number) => void;
}

const MemberCard = ({ member, renewMembership }: MemberCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const daysLeft = daysRemaining(member.expirationDate);
  
  const getStatusColor = () => {
    if (daysLeft < 0) return "text-[#ea384c]"; // Expired
    if (daysLeft <= 7) return "text-[#ff9500]"; // Warning
    return "text-green-600"; // Active
  };
  
  const getStatusText = () => {
    if (daysLeft < 0) return "Expired";
    if (daysLeft === 0) return "Expires today";
    return `${daysLeft} day${daysLeft !== 1 ? 's' : ''} remaining`;
  };
  
  return (
    <Card className="border-l-4 overflow-hidden" style={{
      borderLeftColor: daysLeft < 0 ? '#ea384c' : daysLeft <= 7 ? '#ff9500' : '#9b87f5'
    }}>
      <CardContent className="p-0">
        <div 
          className="p-4 flex justify-between items-center cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div>
            <h3 className="font-semibold text-lg">{member.name}</h3>
            <p className={`text-sm ${getStatusColor()}`}>
              {getStatusText()}
            </p>
          </div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              renewMembership(member.id);
            }}
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
          >
            Renew
          </Button>
        </div>
        
        {isExpanded && (
          <div className="border-t px-4 py-3 bg-gray-50">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center">
                <Phone size={16} className="text-[#8E9196] mr-2" />
                <span className="text-sm">{member.phone}</span>
              </div>
              <div className="flex items-center">
                <DollarSign size={16} className="text-[#8E9196] mr-2" />
                <span className="text-sm">${member.amount}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="text-[#8E9196] mr-2" />
                <span className="text-sm">Joined: {formatDate(member.joinDate)}</span>
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="text-[#8E9196] mr-2" />
                <span className="text-sm">Expires: {formatDate(member.expirationDate)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberCard;
