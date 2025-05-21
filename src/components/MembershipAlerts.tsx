
import { Member } from "@/types/member";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { isWithinDays } from "@/utils/dateUtils";
import { AlertCircle } from "lucide-react";

interface MembershipAlertsProps {
  members: Member[];
}

const MembershipAlerts = ({ members }: MembershipAlertsProps) => {
  const expiredMembers = members.filter(member => 
    isWithinDays(new Date(member.expirationDate), new Date(), 0, true)
  );
  
  const expiringMembers = members.filter(member => 
    isWithinDays(new Date(member.expirationDate), new Date(), 7) && 
    !isWithinDays(new Date(member.expirationDate), new Date(), 0, true)
  );
  
  if (expiredMembers.length === 0 && expiringMembers.length === 0) {
    return null;
  }
  
  return (
    <div className="space-y-3 mb-6">
      {expiredMembers.length > 0 && (
        <Alert className="border-[#ea384c]/20 bg-[#ea384c]/10 text-[#ea384c]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Expired Memberships</AlertTitle>
          <AlertDescription>
            {expiredMembers.length} {expiredMembers.length === 1 ? 'member has' : 'members have'} expired memberships.
          </AlertDescription>
        </Alert>
      )}
      
      {expiringMembers.length > 0 && (
        <Alert className="border-[#ff9500]/20 bg-[#ff9500]/10 text-[#ff9500]">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Expiring Soon</AlertTitle>
          <AlertDescription>
            {expiringMembers.length} {expiringMembers.length === 1 ? 'membership is' : 'memberships are'} expiring in the next 7 days.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MembershipAlerts;
