"use client";
import { useState, useEffect } from "react";

// Mock data types
interface LoanAccount {
  accountRef: string;
  externalRef: string;
  loanType: string;
  availableAmount: number;
  totalAmount: number;
  interestRate: number;
  isLoc?: boolean;
}

interface Transaction {
  id: string;
  type: string;
  amount: number;
  date: string;
  time: string;
}

interface BannerItem {
  id: string;
  title: string;
  image: string;
}

interface LoanAppStatus {
  isFinalStatusHideCard: boolean;
  isRegistered: boolean;
  isNoRegisterLoan: boolean;
  status: string;
}

// Mock data
const mockLoanAccount: LoanAccount = {
  accountRef: "LA001",
  externalRef: "EXT001", 
  loanType: "สินเชื่อส่วนบุคคล",
  availableAmount: 150000,
  totalAmount: 200000,
  interestRate: 12.99
};

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "เบิกเงิน", 
    amount: -25000,
    date: "21 ก.ค. 2567",
    time: "14:30"
  },
  {
    id: "2", 
    type: "ชำระดอกเบี้ย",
    amount: -2150,
    date: "15 ก.ค. 2567", 
    time: "09:15"
  },
  {
    id: "3",
    type: "คืนเงินต้น",
    amount: 50000,
    date: "10 ก.ค. 2567",
    time: "16:45"
  },
  {
    id: "4",
    type: "เบิกเงิน",
    amount: -75000,
    date: "05 ก.ค. 2567", 
    time: "11:20"
  }
];

const mockBanners: BannerItem[] = [
  {
    id: "1",
    title: "โปรโมชั่นพิเศษ",
    image: "/images/banner1.jpg"
  }
];

const mockLoanAppStatus: LoanAppStatus = {
  isFinalStatusHideCard: false,
  isRegistered: false,
  isNoRegisterLoan: false,
  status: "pending"
};

// Components
const HomeHeader = ({ isLoading, loanAccount }: { isLoading: boolean; loanAccount: LoanAccount }) => (
  <div className="bg-gradient-to-br from-blue-600 to-blue-400 text-white p-4 text-center">
    <h1 className="text-xl font-bold mb-2">KTB NEXT Loan</h1>
    <p className="text-sm opacity-90">
      {isLoading ? "กำลังโหลด..." : "ยินดีต้อนรับ คุณสมชาย"}
    </p>
  </div>
);

const LoanHeaderCard = ({ 
  account, 
  isLoading,
  activeIndex,
  onSlideChange 
}: { 
  account: LoanAccount; 
  isLoading: boolean;
  activeIndex: number;
  onSlideChange: (index: number) => void;
}) => (
  <div className="mx-4 mt-4">
    <div className="bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl p-6 text-white shadow-lg">
      {isLoading ? (
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded w-1/2 mb-3"></div>
          <div className="h-8 bg-white/20 rounded w-3/4 mb-4"></div>
          <div className="flex justify-between">
            <div className="h-3 bg-white/20 rounded w-1/3"></div>
            <div className="h-3 bg-white/20 rounded w-1/4"></div>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-3">{account.loanType}</h2>
          <div className="mb-4">
            <p className="text-sm opacity-90 mb-1">วงเงินคงเหลือ</p>
            <h3 className="text-2xl font-bold">
              ฿ {account.availableAmount.toLocaleString()}.00
            </h3>
          </div>
          <div className="flex justify-between text-sm">
            <span>วงเงินทั้งหมด: ฿ {account.totalAmount.toLocaleString()}.00</span>
            <span>ดอกเบี้ย: {account.interestRate}%</span>
          </div>
        </>
      )}
    </div>
  </div>
);

const HomeMenuList = ({ isLoading }: { isLoading: boolean }) => {
  const menuItems = [
    { icon: "💰", label: "เบิกเงิน", action: "drawdown" },
    { icon: "📊", label: "ประวัติการใช้งาน", action: "history" },
    { icon: "📧", label: "E-Statement", action: "statement" },
    { icon: "📱", label: "E-Receipt", action: "receipt" },
    { icon: "🔒", label: "ปิดบัญชี", action: "close" },
    { icon: "⚙️", label: "การตั้งค่า", action: "settings" }
  ];

  const handleMenuClick = (action: string, label: string) => {
    alert(`คลิก: ${label}\n(นี่คือ React demo version)`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg p-4 animate-pulse">
            <div className="w-8 h-8 bg-gray-300 rounded mb-2 mx-auto"></div>
            <div className="h-3 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => handleMenuClick(item.action, item.label)}
          className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
        >
          <div className="text-2xl mb-2">{item.icon}</div>
          <div className="text-sm font-medium text-gray-800">{item.label}</div>
        </button>
      ))}
    </div>
  );
};

const LoanTransaction = ({ 
  transactions, 
  isLoading 
}: { 
  transactions: Transaction[]; 
  isLoading: boolean; 
}) => {
  if (isLoading) {
    return (
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 mb-2 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">ประวัติการทำรายการล่าสุด</h3>
      {transactions.map((transaction) => (
        <div key={transaction.id} className="bg-white border border-gray-200 rounded-lg p-4 mb-2 flex justify-between items-center">
          <div>
            <div className="font-medium text-gray-800">{transaction.type}</div>
            <div className="text-sm text-gray-500">{transaction.date} | {transaction.time}</div>
          </div>
          <div className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {transaction.amount > 0 ? '+' : ''}฿ {Math.abs(transaction.amount).toLocaleString()}.00
          </div>
        </div>
      ))}
    </div>
  );
};

const PullToRefresh = ({ isLoading, onRefresh }: { isLoading: boolean; onRefresh: () => void }) => {
  return (
    <div className="text-center p-2">
      {isLoading && (
        <div className="text-sm text-gray-500">กำลังรีเฟรชข้อมูล...</div>
      )}
    </div>
  );
};

// Main Component
const KTBHomeScreen = () => {
  const [account, setAccount] = useState<LoanAccount>(mockLoanAccount);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleReloadPage = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('ข้อมูลถูกรีเฟรชแล้ว!');
    }, 1000);
  };

  const handleChangeCardIndex = (index: number) => {
    setActiveCardIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Safe Area */}
      <div className="bg-red-500 fixed top-0 left-0 right-0 h-[env(safe-area-inset-top)] z-50"></div>
      
      {/* Header */}
      <div className="pt-[env(safe-area-inset-top)]">
        <HomeHeader isLoading={isLoading} loanAccount={account} />
      </div>
      
      {/* Loan Card */}
      <LoanHeaderCard 
        account={account}
        isLoading={isLoading}
        activeIndex={activeCardIndex}
        onSlideChange={handleChangeCardIndex}
      />
      
      {/* Pull to Refresh */}
      <PullToRefresh isLoading={isLoading} onRefresh={handleReloadPage} />
      
      {/* Content */}
      <div className="flex-1 flex flex-col gap-2 mt-6">
        {/* Menu */}
        <HomeMenuList isLoading={isLoading} />
        
        {/* Transactions */}
        <LoanTransaction 
          transactions={transactions}
          isLoading={isLoading}
        />
        
        {/* Quick Actions */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">การดำเนินการด่วน</h3>
          <div className="flex gap-2">
            <button 
              onClick={() => alert('เบิกเงินด่วน!')}
              className="flex-1 bg-blue-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-blue-700 transition-colors"
            >
              เบิกเงินด่วน
            </button>
            <button 
              onClick={() => alert('ดูยอดคงเหลือ!')}
              className="flex-1 bg-white text-blue-600 border border-blue-600 rounded-lg py-3 px-4 font-medium hover:bg-blue-50 transition-colors"
            >
              ดูยอดคงเหลือ
            </button>
          </div>
        </div>
      </div>
      
      {/* Bottom Safe Area */}
      <div className="bg-red-500 fixed bottom-0 left-0 right-0 h-[env(safe-area-inset-bottom)] z-50"></div>
    </div>
  );
};

export default KTBHomeScreen;