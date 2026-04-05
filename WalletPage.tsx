import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { getUserTransactions } from '../lib/mockData';
import { Transaction } from '../lib/types';
import {
  Wallet as WalletIcon,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Smartphone,
  Building,
  Download,
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
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

export default function WalletPage() {
  const { user } = useAuth();
  const [topUpAmount, setTopUpAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'bank' | 'ussd'>('card');
  const [showTopUpDialog, setShowTopUpDialog] = useState(false);

  if (!user) return null;

  const transactions = getUserTransactions(user.id);

  const totalCredit = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (amount < 100) {
      toast.error('Minimum top-up amount is ₦100');
      return;
    }

    // Simulate payment processing
    toast.success(`Wallet topped up successfully! Added ₦${amount.toLocaleString()} to your wallet.`);
    setShowTopUpDialog(false);
    setTopUpAmount('');
  };

  const quickAmounts = [1000, 2000, 5000, 10000];

  const TransactionItem = ({ transaction }: { transaction: Transaction }) => (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {transaction.type === 'credit' ? (
            <ArrowUpRight className="w-5 h-5 text-green-600" />
          ) : (
            <ArrowDownRight className="w-5 h-5 text-red-600" />
          )}
        </div>
        <div>
          <p className="font-medium">{transaction.description}</p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-gray-500">{transaction.date}</p>
            <Badge variant={
              transaction.status === 'completed' ? 'default' :
              transaction.status === 'pending' ? 'secondary' : 'destructive'
            } className="text-xs">
              {transaction.status}
            </Badge>
          </div>
          <p className="text-xs text-gray-400 mt-1">Ref: {transaction.reference}</p>
        </div>
      </div>
      <span className={`font-bold text-lg ${
        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
      }`}>
        {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
      </span>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Wallet</h1>
        <p className="text-gray-600 mt-1">Manage your wallet and transactions</p>
      </div>

      {/* Wallet Balance Card */}
      <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 mb-2">Available Balance</p>
              <h2 className="text-4xl font-bold mb-4">₦{user.walletBalance.toLocaleString()}</h2>
              <Dialog open={showTopUpDialog} onOpenChange={setShowTopUpDialog}>
                <DialogTrigger asChild>
                  <Button variant="secondary">Top Up Wallet</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top Up Wallet</DialogTitle>
                    <DialogDescription>
                      Add funds to your wallet to use our services
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (₦)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        value={topUpAmount}
                        onChange={(e) => setTopUpAmount(e.target.value)}
                        min="100"
                      />
                      <p className="text-sm text-gray-500">Minimum: ₦100</p>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {quickAmounts.map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          onClick={() => setTopUpAmount(amount.toString())}
                        >
                          ₦{amount.toLocaleString()}
                        </Button>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'}
                          className="flex flex-col h-auto py-3"
                          onClick={() => setSelectedPaymentMethod('card')}
                        >
                          <CreditCard className="w-5 h-5 mb-1" />
                          <span className="text-xs">Card</span>
                        </Button>
                        <Button
                          variant={selectedPaymentMethod === 'bank' ? 'default' : 'outline'}
                          className="flex flex-col h-auto py-3"
                          onClick={() => setSelectedPaymentMethod('bank')}
                        >
                          <Building className="w-5 h-5 mb-1" />
                          <span className="text-xs">Bank</span>
                        </Button>
                        <Button
                          variant={selectedPaymentMethod === 'ussd' ? 'default' : 'outline'}
                          className="flex flex-col h-auto py-3"
                          onClick={() => setSelectedPaymentMethod('ussd')}
                        >
                          <Smartphone className="w-5 h-5 mb-1" />
                          <span className="text-xs">USSD</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowTopUpDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleTopUp}>
                      Proceed to Payment
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <WalletIcon className="w-20 h-20 text-blue-200" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">₦{totalCredit.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Debits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">₦{totalDebit.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{transactions.length}</p>
            <p className="text-sm text-gray-500 mt-1">Total transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all your wallet transactions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="credit">Credits</TabsTrigger>
              <TabsTrigger value="debit">Debits</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              {transactions.length > 0 ? (
                <div className="space-y-2">
                  {transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No transactions yet
                </div>
              )}
            </TabsContent>

            <TabsContent value="credit" className="mt-4">
              <div className="space-y-2">
                {transactions.filter(t => t.type === 'credit').map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="debit" className="mt-4">
              <div className="space-y-2">
                {transactions.filter(t => t.type === 'debit').map((transaction) => (
                  <TransactionItem key={transaction.id} transaction={transaction} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
