'use client';

import { useState } from 'react';
import { Shield, Briefcase, Activity, DollarSign, AlertCircle, Search, Check } from 'lucide-react';
import { SuccessDialog } from './ui/SuccessDialog';
import { FileClaimForm, type ClaimFormData } from './insurance/claims/FileClaimForm';
import { MOCK_ACTIVE_POLICIES } from '@/app/types/insurance';
interface CoverageOption {
  id: string;
  name: string;
  title: string;
  description: string;
  coverageAmount: number[];
  minAmount: number;
  maxAmount: number;
  riskLevel: 'Low' | 'Medium' | 'Medium-High' | 'High';
  premiumRate: number;
  popularity: number;
  icon: string;
}

const coverageOptions: CoverageOption[] = [
  {
    id: '1',
    name: "Exchange Hack Protection",
    title: "Exchange Hack Protection",
    description: "Coverage against loss of funds due to exchange security breaches",
    coverageAmount: [1, 5, 10, 25, 50],
    minAmount: 1,
    maxAmount: 50,
    riskLevel: "Medium-High",
    premiumRate: 0.3, // 0.3% annual rate (0.025% monthly)
    popularity: 93,
    icon: "🛡️"
  },
  {
    id: '2',
    name: "Smart Contract Failure",
    title: "Smart Contract Failure",
    description: "Protection against losses from smart contract bugs or exploits",
    coverageAmount: [0.5, 1, 2.5, 5, 10],
    minAmount: 0.5,
    maxAmount: 10,
    riskLevel: "High",
    premiumRate: 0.5, // 0.5% annual rate (0.042% monthly)
    popularity: 87,
    icon: "📝"
  },
  {
    id: '3',
    name: "Stablecoin Depeg Coverage",
    title: "Stablecoin Depeg Coverage",
    description: "Insurance against stablecoin value loss from depegging events",
    coverageAmount: [1000, 5000, 10000, 25000, 50000],
    minAmount: 1000,
    maxAmount: 50000,
    riskLevel: "Medium",
    premiumRate: 0.002, // 0.2% monthly
    popularity: 78,
    icon: "💵"
  },
  {
    id: '4',
    name: "Wallet Recovery Protection",
    title: "Wallet Recovery Protection",
    description: "Coverage for lost access to your wallet or private keys",
    coverageAmount: [0.5, 1, 2, 5, 10],
    minAmount: 0.5,
    maxAmount: 10,
    riskLevel: "Low",
    premiumRate: 0.001, // 0.1% monthly
    popularity: 65,
    icon: "🔑"
  }
];

export function Marketplace() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCoverage, setSelectedCoverage] = useState<CoverageOption | null>(null);
  const [coverageAmount, setCoverageAmount] = useState(0);
  const [duration, setDuration] = useState(3);
  const [showSuccess, setShowSuccess] = useState(false);
  const [purchaseAmount, setPurchaseAmount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showClaimForm, setShowClaimForm] = useState(false);

  const handleSelectCoverage = (coverage: CoverageOption) => {
    setSelectedCoverage(coverage);
    setCoverageAmount(coverage.coverageAmount[1]);
  };

  const calculatePremium = () => {
    if (!selectedCoverage) return 0;
    return (selectedCoverage.premiumRate * coverageAmount * duration).toFixed(6);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(parseInt(e.target.value));
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Medium-High": return "bg-orange-100 text-orange-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handlePurchase = async () => {
    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPurchaseAmount(coverageAmount);
      console.log(purchaseAmount)
      setShowSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'marketplace':
        return (
          <main className="p-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search for coverage types..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-bitcoin"
                />
              </div>
              
              <div className="flex space-x-2">
                <select className="px-4 py-2 border text-gray-400 border-gray-200 rounded-lg focus:outline-none">
                  <option>All Risks</option>
                  <option>Exchange Risks</option>
                  <option>Smart Contract Risks</option>
                  <option>Wallet Risks</option>
                </select>
                
                <select className="px-4 py-2 border text-gray-400 border-gray-200 rounded-lg focus:outline-none">
                  <option>Sort by Popularity</option>
                  <option>Sort by Premium (Low to High)</option>
                  <option>Sort by Premium (High to Low)</option>
                  <option>Sort by Risk Level</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Coverage Cards */}
              <div className="lg:col-span-2 space-y-4">
                {coverageOptions.map(coverage => (
                  <div 
                    key={coverage.id} 
                    className={`bg-white rounded-xl shadow-sm overflow-hidden border-2 transition-all cursor-pointer ${selectedCoverage?.id === coverage.id ? 'border-bitcoin' : 'border-transparent hover:border-gray-200'}`}
                    onClick={() => handleSelectCoverage(coverage)}
                  >
                    <div className="p-6 flex items-start">
                      <div className="flex-shrink-0 text-4xl mr-4">
                        {coverage.icon}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{coverage.title}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskColor(coverage.riskLevel)}`}>
                            {coverage.riskLevel} Risk
                          </span>
                        </div>
                        
                        <p className="text-gray-900 text-sm mb-3">{coverage.description}</p>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center text-gray-900">
                            <DollarSign className="h-4 w-4 mr-1" />
                            <span>{coverage.name} Coverage</span>
                          </div>
                          
                          <div className="flex items-center text-gray-900">
                            <Activity className="h-4 w-4 mr-1" />
                            <span>{coverage.popularity}% of users purchase</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Coverage Configurator */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-sm sticky top-6 pb-[120px]">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Configure Your Coverage</h3>
                    <p className="text-gray-900 text-sm mt-1">
                      {selectedCoverage ? "Customize your insurance parameters" : "Select a coverage type to configure"}
                    </p>
                  </div>
                  
                  {selectedCoverage ? (
                    <>
                      <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-240px)]">
                        {/* Coverage Amount */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Coverage Amount ({selectedCoverage.name})
                          </label>
                          
                          <input 
                            type="range" 
                            min={selectedCoverage.minAmount} 
                            max={selectedCoverage.maxAmount} 
                            step={selectedCoverage.maxAmount - selectedCoverage.minAmount}
                            value={coverageAmount}
                            onChange={(e) => setCoverageAmount(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-bitcoin"
                          />
                          
                          <div className="flex justify-between mt-2">
                            <span className="text-sm text-gray-900">
                              {selectedCoverage.minAmount}
                            </span>
                            <span className="text-lg font-semibold text-gray-900">
                              {coverageAmount}
                            </span>
                            <span className="text-sm text-gray-900">
                              {selectedCoverage.maxAmount}
                            </span>
                          </div>
                        </div>
                        
                        {/* Coverage Duration */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Coverage Duration
                          </label>
                          
                          <div className="grid grid-cols-3 gap-2">
                            {[1, 3, 6].map((months) => (
                              <label 
                                key={months}
                                className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${
                                  duration === months 
                                    ? 'bg-green-50 border-green-600 text-green-700' 
                                    : 'border-gray-400 text-gray-400 hover:bg-gray-50'
                                }`}
                              >
                                <input 
                                  type="radio" 
                                  name="duration" 
                                  value={months} 
                                  checked={duration === months}
                                  onChange={handleDurationChange}
                                  className="sr-only"
                                />
                                <span>{months} {months === 1 ? 'Month' : 'Months'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        {/* Coverage Details */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-900">Monthly Premium:</span>
                            <span className="font-medium text-gray-900">
                              {(selectedCoverage.premiumRate * coverageAmount).toFixed(6)} ETH
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-900">Total Premium:</span>
                            <span className="font-medium text-gray-900">
                              {calculatePremium()} ETH
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-gray-900">Coverage Period:</span>
                            <span className="font-medium text-gray-900">
                              {duration} {duration === 1 ? 'Month' : 'Months'}
                            </span>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-3 mt-3">
                            <div className="flex justify-between items-center text-lg">
                              <span className="font-medium text-gray-900">Total Cost:</span>
                              <span className="font-bold text-bitcoin">
                                {calculatePremium()} ETH
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Coverage Features */}
                        <div>
                          <h4 className="font-medium mb-3 text-gray-900">Coverage Includes:</h4>
                          
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-900">24/7 Protection against {selectedCoverage.title.toLowerCase()}</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-900">Automatic claims processing via oracles</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-900">100% payout for verified incidents</span>
                            </li>
                            <li className="flex items-start">
                              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-900">No deductibles or hidden fees</span>
                            </li>
                          </ul>
                        </div>
                        
                        {/* Premium Summary */}
                        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                          <div className="flex items-start gap-4">
                            <AlertCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-gray-900">Premium Summary</h4>
                              <div className="mt-2 space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Monthly Premium:</span>
                                  <span className="font-medium text-gray-900">{calculatePremium()} ETH</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Coverage Period:</span>
                                  <span className="font-medium text-gray-900">{duration} {duration === 1 ? 'Month' : 'Months'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Coverage Amount:</span>
                                  <span className="font-medium text-gray-900">{coverageAmount} ETH</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Fixed Purchase Button Section */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
                        <button
                          onClick={handlePurchase}
                          disabled={isSubmitting}
                          className="w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl 
                            transition-all transform hover:scale-[1.02] active:scale-[0.98] 
                            font-bold text-lg shadow-md hover:shadow-lg
                            disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Shield className="h-5 w-5" />
                              Purchase Coverage
                            </>
                          )}
                        </button>
                        <p className="text-center text-sm text-gray-600 mt-3">
                          Secure coverage instantly with automatic claim processing
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 flex flex-col items-center justify-center text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-8 w-8 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">No Coverage Selected</h4>
                      <p className="text-gray-900 text-sm">
                        Select an insurance product from the marketplace to configure your coverage.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <SuccessDialog
              isOpen={showSuccess}
              onClose={() => setShowSuccess(false)}
              title="Coverage Purchased!"
              message={`Successfully purchased  ${selectedCoverage?.name} coverage`}
            />
          </main>
        );
      case 'dashboard':
        return (
          <div className="p-6 space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Total Coverage</h3>
                  <DollarSign className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">12.45 ETH</p>
                <span className="text-green-600 text-sm flex items-center mt-2">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7l-5 5 1.4 1.4L12 9.8l3.6 3.6L17 12l-5-5z" />
                  </svg>
                  +2.5% from last month
                </span>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Active Policies</h3>
                  <Shield className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">3</p>
                <span className="text-gray-600 text-sm mt-2 block">
                  All policies active
                </span>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Monthly Premium</h3>
                  <Activity className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">0.0145 ETH</p>
                <span className="text-gray-600 text-sm mt-2 block">
                  Next payment in 12 days
                </span>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Claims History</h3>
                  <AlertCircle className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">0</p>
                <span className="text-green-600 text-sm mt-2 block">
                  No active claims
                </span>
              </div>
            </div>

            {/* Active Policies */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Active Policies</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {/* Exchange Hack Protection Policy */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">🛡️</div>
                        <div>
                          <h3 className="font-medium text-gray-900">Exchange Hack Protection</h3>
                          <p className="text-sm text-gray-600">Coverage: 5.00 ETH</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Premium: 0.005 ETH/month</span>
                      <span className="text-gray-600">Expires in 89 days</span>
                    </div>
                  </div>

                  {/* Smart Contract Policy */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">📝</div>
                        <div>
                          <h3 className="font-medium text-gray-900">Smart Contract Coverage</h3>
                          <p className="text-sm text-gray-600">Coverage: 2.45 ETH</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Premium: 0.00735 ETH/month</span>
                      <span className="text-gray-600">Expires in 152 days</span>
                    </div>
                  </div>

                  {/* Wallet Recovery Policy */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">🔑</div>
                        <div>
                          <h3 className="font-medium text-gray-900">Wallet Recovery Protection</h3>
                          <p className="text-sm text-gray-600">Coverage: 5.00 ETH</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Premium: 0.0025 ETH/month</span>
                      <span className="text-gray-600">Expires in 243 days</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">Premium Payment Processed</p>
                      <p className="text-sm text-gray-600">0.005 ETH for Exchange Hack Protection</p>
                    </div>
                    <span className="text-sm text-gray-600">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">Policy Renewed</p>
                      <p className="text-sm text-gray-600">Smart Contract Coverage extended for 6 months</p>
                    </div>
                    <span className="text-sm text-gray-600">5 days ago</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">Coverage Increased</p>
                      <p className="text-sm text-gray-600">Wallet Recovery Protection increased to 5.00 ETH</p>
                    </div>
                    <span className="text-sm text-gray-600">1 week ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'claims':
        return (
          <div className="p-6 space-y-6">
            {/* Claims Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Total Claims</h3>
                  <AlertCircle className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">2</p>
                <span className="text-gray-600 text-sm mt-2 block">
                  All time
                </span>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Active Claims</h3>
                  <Activity className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">1</p>
                <span className="text-orange-600 text-sm mt-2 block">
                  In processing
                </span>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Successful Claims</h3>
                  <Check className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">1</p>
                <span className="text-green-600 text-sm mt-2 block">
                  100% success rate
                </span>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-500 text-sm">Total Payout</h3>
                  <DollarSign className="h-5 w-5 text-bitcoin opacity-50" />
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">1.5 ETH</p>
                <span className="text-gray-600 text-sm mt-2 block">
                  Lifetime payouts
                </span>
              </div>
            </div>

            {/* Claims List */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Claims History</h2>
                  <p className="text-sm text-gray-600 mt-1">View and manage your insurance claims</p>
                </div>
                <button 
                  onClick={() => setShowClaimForm(true)} 
                  className="px-4 py-2 bg-bitcoin font-bold hover:bg-bitcoin-hover text-white rounded-lg transition-colors"
                >
                  File New Claim
                </button>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {/* Active Claim */}
                  <div className="border border-orange-200 bg-orange-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">📝</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">Smart Contract Exploit Claim</h3>
                            <span className="px-2.5 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                              Processing
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Claim Amount: 0.75 ETH</p>
                        </div>
                      </div>
                      <button className="text-sm text-orange-600 hover:text-orange-700">
                        View Details
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-orange-100 rounded-full h-2">
                        <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>Claim Filed</span>
                        <span>Verification</span>
                        <span>Processing</span>
                        <span>Completed</span>
                      </div>
                    </div>
                  </div>

                  {/* Completed Claim */}
                  <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">🛡️</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-gray-900">Exchange Hack Protection Claim</h3>
                            <span className="px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              Completed
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">Claim Amount: 0.75 ETH</p>
                        </div>
                      </div>
                      <button className="text-sm text-green-600 hover:text-green-700">
                        View Details
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="w-full bg-green-100 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-full"></div>
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>Claim Filed</span>
                        <span>Verification</span>
                        <span>Processing</span>
                        <span>Completed</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-green-100 rounded-lg text-sm text-green-800">
                      <p className="font-medium">Claim successfully processed</p>
                      <p className="mt-1">Payout of 0.75 ETH was processed on July 15, 2023</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Claims FAQ */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900">Claims FAQ</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">How do I file a claim?</h3>
                  <p className="text-gray-600 text-sm">Click the &quot;File New Claim&quot; button above and follow the guided process. Make sure to have all relevant documentation ready.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">How long does processing take?</h3>
                  <p className="text-gray-600 text-sm">Most claims are processed within 24-48 hours. Complex cases may take up to 5 business days.</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">What documentation do I need?</h3>
                  <p className="text-gray-600 text-sm">Required documentation varies by claim type. Common requirements include transaction hashes, wallet addresses, and incident reports.</p>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 text-gray-900 py-8 px-4 hidden md:block">
        <nav className="space-y-2">
          <button 
            className={`flex items-center w-full px-4 py-3 rounded-lg ${
              activeTab === 'dashboard' 
                ? 'bg-white shadow-sm text-bitcoin' 
                : 'hover:bg-white hover:text-bitcoin'
            }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <Activity className="h-5 w-5 mr-3" />
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`flex items-center w-full px-4 py-3 rounded-lg ${
              activeTab === 'marketplace' 
                ? 'bg-white shadow-sm text-bitcoin' 
                : 'hover:bg-white hover:text-bitcoin'
            }`}
            onClick={() => setActiveTab('marketplace')}
          >
            <Briefcase className="h-5 w-5 mr-3" />
            <span className="text-left">Coverage Marketplace</span>
          </button>
          
          <button 
            className={`flex items-center w-full px-4 py-3 rounded-lg ${
              activeTab === 'claims' 
                ? 'bg-white shadow-sm text-bitcoin' 
                : 'hover:bg-white hover:text-bitcoin'
            }`}
            onClick={() => setActiveTab('claims')}
          >
            <AlertCircle className="h-5 w-5 mr-3" />
            <span>Claims</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <header className="bg-white shadow-sm px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {activeTab === 'marketplace' ? 'Coverage Marketplace' : 
             activeTab === 'claims' ? 'Claims' : 'Dashboard'}
          </h2>
          <p className="text-gray-900 mt-1">
            {activeTab === 'marketplace' ? 'Protect your Bitcoin assets with our insurance products' : 
             activeTab === 'claims' ? 'Manage your insurance claims' : 'Overview of your coverage'}
          </p>
        </header>

        {/* Dynamic Content */}
        {renderContent()}
      </div>

      {/* Only render FileClaimForm when showClaimForm is true */}
      {showClaimForm && (
        <FileClaimForm
          isOpen={showClaimForm}
          onClose={() => setShowClaimForm(false)}
          activePolicies={MOCK_ACTIVE_POLICIES}
          onSubmit={(data: ClaimFormData) => {
            console.log('Claim submitted:', data);
            setShowClaimForm(false);
          }}
        />
      )}
    </div>
  );
} 