
import { useState, useEffect } from "react";
import MemberList from "@/components/MemberList";
import AddMemberForm from "@/components/AddMemberForm";
import MembershipAlerts from "@/components/MembershipAlerts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Member } from "@/types/member";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { isWithinDays } from "@/utils/dateUtils";

const Index = () => {
  const [members, setMembers] = useState<Member[]>(() => {
    const savedMembers = localStorage.getItem("gymMembers");
    return savedMembers ? JSON.parse(savedMembers) : [];
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    localStorage.setItem("gymMembers", JSON.stringify(members));
    
    // Check for expiring memberships on load
    const expiringMembers = members.filter(member => 
      isWithinDays(new Date(member.expirationDate), new Date(), 7) && 
      !isWithinDays(new Date(member.expirationDate), new Date(), 0, true)
    );
    
    if (expiringMembers.length > 0) {
      toast({
        title: "Memberships Expiring Soon",
        description: `${expiringMembers.length} member(s) will expire in the next 7 days.`,
        variant: "default",
      });
    }
  }, [members, toast]);
  
  const addMember = (member: Member) => {
    setMembers([...members, member]);
    setShowAddForm(false);
    toast({
      title: "Member Added",
      description: `${member.name} has been added successfully.`,
      variant: "default",
    });
  };
  
  const renewMembership = (id: string, days: number = 30) => {
    setMembers(members.map(member => {
      if (member.id === id) {
        const currentDate = new Date(member.expirationDate);
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + days);
        
        return {
          ...member,
          expirationDate: newDate.toISOString().split("T")[0]
        };
      }
      return member;
    }));
    
    const member = members.find(m => m.id === id);
    if (member) {
      toast({
        title: "Membership Renewed",
        description: `${member.name}'s membership has been renewed for ${days} days.`,
        variant: "default",
      });
    }
  };
  
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };
  
  return (
    <div className="min-h-screen bg-[#F2F2F7] px-4 py-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#1A1F2C]">Gym Membership</h1>
        <p className="text-[#8E9196] mt-1">Manage your gym members easily</p>
      </header>
      
      <MembershipAlerts members={members} />
      
      <Tabs defaultValue="members" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="expired">Expiring Soon</TabsTrigger>
        </TabsList>
        
        <TabsContent value="members" className="space-y-4">
          {!showAddForm && (
            <div className="flex justify-end">
              <Button 
                onClick={toggleAddForm} 
                className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>
          )}
          
          {showAddForm && (
            <AddMemberForm 
              onAddMember={addMember} 
              onCancel={() => setShowAddForm(false)} 
            />
          )}
          
          <MemberList 
            members={members} 
            renewMembership={renewMembership} 
          />
        </TabsContent>
        
        <TabsContent value="expired">
          <MemberList 
            members={members.filter(member => 
              isWithinDays(new Date(member.expirationDate), new Date(), 7)
            )} 
            renewMembership={renewMembership} 
            showOnlyExpiring={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
