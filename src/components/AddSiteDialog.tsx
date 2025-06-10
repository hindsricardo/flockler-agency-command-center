
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

interface AddSiteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddSite: (site: any) => void;
}

const AddSiteDialog = ({ open, onOpenChange, onAddSite }: AddSiteDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    maxFeeds: 8
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.domain.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newSite = {
      name: formData.name.trim(),
      client: formData.name.trim(), // Use site name as client name
      domain: formData.domain.trim(),
      feedLimit: formData.maxFeeds
    };

    onAddSite(newSite);
    
    // Reset form
    setFormData({
      name: '',
      domain: '',
      maxFeeds: 8
    });

    toast({
      title: "Site Created",
      description: `${newSite.name} has been successfully added.`,
    });
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client Site</DialogTitle>
          <DialogDescription>
            Create a new site for your client. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Client Site Name *</Label>
            <Input
              id="name"
              placeholder="Enter client site name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Domain *</Label>
            <Input
              id="domain"
              placeholder="example.com"
              value={formData.domain}
              onChange={(e) => handleInputChange('domain', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxFeeds">Max Number of Feeds</Label>
            <Input
              id="maxFeeds"
              type="number"
              min="1"
              value={formData.maxFeeds}
              onChange={(e) => handleInputChange('maxFeeds', parseInt(e.target.value) || 8)}
            />
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
