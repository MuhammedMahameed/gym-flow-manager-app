
import { useState } from "react";
import { Member } from "@/types/member";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface AddMemberFormProps {
  onAddMember: (member: Member) => void;
  onCancel: () => void;
}

const AddMemberForm = ({ onAddMember, onCancel }: AddMemberFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate unique ID
    const id = `member_${Date.now()}`;
    
    // Get current date for join date
    const today = new Date();
    const joinDate = today.toISOString().split("T")[0];
    
    // Calculate expiration date (30 days from now)
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 30);
    
    const newMember: Member = {
      id,
      name,
      phone,
      amount: parseFloat(amount),
      joinDate,
      expirationDate: expirationDate.toISOString().split("T")[0]
    };
    
    onAddMember(newMember);
    
    // Reset form
    setName("");
    setPhone("");
    setAmount("");
  };
  
  return (
    <Card className="border-t-4 border-t-[#9b87f5]">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">New Member</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onCancel}
          >
            <X size={18} />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-white"
              placeholder="John Doe"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="bg-white"
              placeholder="(123) 456-7890"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="amount">Membership Fee ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min="0"
              step="0.01"
              className="bg-white"
              placeholder="50.00"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            >
              Add Member
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMemberForm;
