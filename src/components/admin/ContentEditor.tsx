
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

export default function ContentEditor() {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');

    const handleSave = () => {
        // In a real app, this would save to the backend
        console.log({ title, content: value });
        toast.success('Article saved successfully!');
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Content Editor</h2>
                    <p className="text-muted-foreground">Create and edit articles, news, and pages.</p>
                </div>
                <Button onClick={handleSave}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Content
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Article Composer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Headline</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter article title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Content Body</Label>
                                <div className="h-[400px] mb-12">
                                    <ReactQuill
                                        theme="snow"
                                        value={value}
                                        onChange={setValue}
                                        modules={modules}
                                        className="h-[350px]"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Publishing Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <select className="w-full p-2 border rounded-md text-sm">
                                    <option>Bank News</option>
                                    <option>Financial Literacy</option>
                                    <option>CSR / Communities</option>
                                    <option>Regulatory Updates</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <div className="p-2 bg-slate-50 border rounded-md text-[10px] font-bold uppercase text-slate-500">
                                    Draft (Auto-saved)
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">Media Assets</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="aspect-video bg-muted rounded-md flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                                <span className="text-xs text-muted-foreground">No Feature Image</span>
                            </div>
                            <Button variant="outline" size="sm" className="w-full">Upload New Media</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
