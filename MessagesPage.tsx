import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { getUserMessages, getUserNotifications } from '../lib/mockData';
import { Message, Notification } from '../lib/types';
import {
  MessageSquare,
  Bell,
  Send,
  Trash2,
  Search,
  Mail,
  MailOpen,
  Info,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { toast } from 'sonner';
import { ScrollArea } from '../components/ui/scroll-area';

export default function MessagesPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState({ subject: '', content: '' });
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showComposeDialog, setShowComposeDialog] = useState(false);

  if (!user) return null;

  const messages = getUserMessages(user.id);
  const notifications = getUserNotifications(user.id);

  const unreadMessages = messages.filter(m => !m.read);
  const unreadNotifications = notifications.filter(n => !n.read);

  const filteredMessages = messages.filter(m =>
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.senderName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.subject || !newMessage.content) {
      toast.error('Please fill in all fields');
      return;
    }

    toast.success('Message sent successfully!');
    setNewMessage({ subject: '', content: '' });
    setShowComposeDialog(false);
  };

  const handleDeleteMessage = (messageId: string) => {
    toast.success('Message deleted');
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
    }
  };

  const MessageItem = ({ message }: { message: Message }) => (
    <div
      className={`p-4 border rounded-lg cursor-pointer transition-all ${
        message.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
      } hover:shadow-md`}
      onClick={() => setSelectedMessage(message)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          {message.read ? (
            <MailOpen className="w-4 h-4 text-gray-400" />
          ) : (
            <Mail className="w-4 h-4 text-blue-600" />
          )}
          <span className="font-semibold">{message.senderName}</span>
        </div>
        <span className="text-sm text-gray-500">
          {new Date(message.date).toLocaleDateString()}
        </span>
      </div>
      <h3 className={`font-medium mb-1 ${!message.read ? 'text-blue-900' : ''}`}>
        {message.subject}
      </h3>
      <p className="text-sm text-gray-600 line-clamp-2">{message.content}</p>
      <div className="flex items-center gap-2 mt-2">
        <Badge variant={message.type === 'support' ? 'default' : 'secondary'}>
          {message.type}
        </Badge>
      </div>
    </div>
  );

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <div className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
      <div className="flex items-start gap-3">
        {getNotificationIcon(notification.type)}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-medium">{notification.title}</h4>
            <span className="text-xs text-gray-500">
              {new Date(notification.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          <p className="text-sm text-gray-600">{notification.message}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Messages & Notifications</h1>
        <p className="text-gray-600 mt-1">Stay connected and informed</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <p className="text-sm text-gray-600">Messages</p>
            </div>
            <p className="text-2xl font-bold">{messages.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Mail className="w-4 h-4 text-orange-600" />
              <p className="text-sm text-gray-600">Unread</p>
            </div>
            <p className="text-2xl font-bold text-orange-600">{unreadMessages.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Bell className="w-4 h-4 text-purple-600" />
              <p className="text-sm text-gray-600">Notifications</p>
            </div>
            <p className="text-2xl font-bold">{notifications.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <p className="text-sm text-gray-600">Alerts</p>
            </div>
            <p className="text-2xl font-bold text-red-600">{unreadNotifications.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages">
        <TabsList>
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Messages
            {unreadMessages.length > 0 && (
              <Badge variant="destructive" className="ml-1 px-1.5 py-0 text-xs">
                {unreadMessages.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Notifications
            {unreadNotifications.length > 0 && (
              <Badge variant="destructive" className="ml-1 px-1.5 py-0 text-xs">
                {unreadNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4 mt-6">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Compose
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Message</DialogTitle>
                  <DialogDescription>
                    Send a message to support or staff
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="What is this about?"
                      value={newMessage.subject}
                      onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="content">Message</Label>
                    <Textarea
                      id="content"
                      placeholder="Type your message here..."
                      value={newMessage.content}
                      onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                      rows={5}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {filteredMessages.length > 0 ? (
            <div className="space-y-3">
              {filteredMessages.map((message) => (
                <MessageItem key={message.id} message={message} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No messages</h3>
                <p className="text-gray-600">You don't have any messages yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 mt-6">
          {notifications.length > 0 ? (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
                <p className="text-gray-600">You're all caught up!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Message Detail Dialog */}
      {selectedMessage && (
        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteMessage(selectedMessage.id)}
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>From: {selectedMessage.senderName}</span>
                <span>•</span>
                <span>{new Date(selectedMessage.date).toLocaleString()}</span>
              </div>
            </DialogHeader>
            <ScrollArea className="max-h-96">
              <div className="py-4">
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.content}</p>
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                Close
              </Button>
              <Button onClick={() => toast.info('Reply feature coming soon')}>
                <Send className="w-4 h-4 mr-2" />
                Reply
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
