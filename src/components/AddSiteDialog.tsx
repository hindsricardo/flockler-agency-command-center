
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface AddSiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSite: (site: any) => void;
}

const AddSiteDialog = ({ open, onOpenChange, onAddSite }: AddSiteDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    client: '',
    feedLimit: '5',
    domain: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.client.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newSite = {
      name: formData.name.trim(),
      client: formData.client.trim(),
      feedLimit: parseInt(formData.feedLimit),
      domain: formData.domain.trim() || undefined
    };

    onAddSite(newSite);
    
    // Reset form
    setFormData({
      name: '',
      client: '',
      feedLimit: '5',
      domain: ''
    });

    toast({
      title: "Site Created",
      description: `${newSite.name} has been successfully added.`,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Site</DialogTitle>
          <DialogDescription>
            Create a new site for your client. You can configure feed limits and other settings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Site Name *</Label>
            <Input
              id="name"
              placeholder="Enter site name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="client">Client Name *</Label>
            <Input
              id="client"
              placeholder="Enter client name"
              value={formData.client}
              onChange={(e) => handleInputChange('client', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain (Optional)</Label>
            <Input
              id="domain"
              placeholder="example.com"
              value={formData.domain}
              onChange={(e) => handleInputChange('domain', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedLimit">Feed Limit</Label>
            <Select value={formData.feedLimit} onValueChange={(value) => handleInputChange('feedLimit', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select feed limit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Feed</SelectItem>
                <SelectItem value="5">5 Feeds</SelectItem>
                <SelectItem value="10">10 Feeds</SelectItem>
                <SelectItem value="25">25 Feeds</SelectItem>
                <SelectItem value="50">50 Feeds</SelectItem>
                <SelectItem value="100">100 Feeds</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Create Site
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddSiteDialog;
