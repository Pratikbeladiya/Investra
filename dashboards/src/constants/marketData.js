export const MUTUAL_FUNDS = [
  {
    id: 1,
    name: "Quantum Long Term Equity Fund",
    category: "EQUITY",
    subCategory: "Large Cap",
    nav: 145.67,
    returns: { '1Y': 18.45, '3Y': 14.23 },
    rating: 4.5,
    risk: "Moderate",
    minInvestment: 500,
    description: "Focuses on long-term capital appreciation through equity investments"
  },
  {
    id: 2,
    name: "Secure Debt Fund",
    category: "DEBT",
    subCategory: "Short Term",
    nav: 23.45,
    returns: { '1Y': 6.78, '3Y': 6.12 },
    rating: 4.0,
    risk: "Low",
    minInvestment: 100,
    description: "Provides stable returns with low risk through debt instruments"
  },
  {
    id: 3,
    name: "Balanced Advantage Fund",
    category: "HYBRID",
    subCategory: "Dynamic Asset Allocation",
    nav: 89.23,
    returns: { '1Y': 12.34, '3Y': 10.56 },
    rating: 4.8,
    risk: "Moderate",
    minInvestment: 1000,
    description: "Dynamic allocation between equity and debt for balanced growth"
  }
];

export const ETFS = [
  {
    id: 101,
    name: "Nifty 50 ETF",
    category: "INDEX",
    subCategory: "Passive",
    nav: 245.30,
    returns: { '1Y': 24.50, '3Y': 16.80 },
    rating: 4.9,
    risk: "Moderate",
    minInvestment: 250,
    description: "Tracks the performance of Nifty 50 index with minimal tracking error"
  },
  {
    id: 102,
    name: "Bank Nifty ETF",
    category: "SECTORAL",
    subCategory: "Banking",
    nav: 482.15,
    returns: { '1Y': 18.20, '3Y': 12.50 },
    rating: 4.5,
    risk: "High",
    minInvestment: 500,
    description: "Invests in the top banking stocks of India via the Bank Nifty index"
  },
  {
    id: 103,
    name: "Gold ETF",
    category: "COMMODITY",
    subCategory: "Precious Metals",
    nav: 52.40,
    returns: { '1Y': 15.40, '3Y': 10.20 },
    rating: 4.7,
    risk: "Moderate",
    minInvestment: 100,
    description: "Paper gold investment tracking domestic physical gold prices"
  }
];

export const BONDS = [
  {
    id: 201,
    name: "Govt of India 7.15% GS 2035",
    category: "SOVEREIGN",
    subCategory: "Gilt",
    price: 102.45,
    coupon: "7.15%",
    maturity: "2035",
    returns: { '1Y': 7.15, '3Y': 7.20 },
    risk: "Sovereign",
    minInvestment: 10000,
    description: "Highly secure government security with fixed semi-annual interest"
  },
  {
    id: 202,
    name: "HDFC Corp Bond 8.25%",
    category: "CORPORATE",
    subCategory: "AA+",
    price: 1005.00,
    coupon: "8.25%",
    maturity: "2029",
    returns: { '1Y': 8.25, '3Y': 8.10 },
    risk: "Low",
    minInvestment: 1000,
    description: "Investment in high-rated corporate bonds for better yield than FDs"
  },
  {
    id: 203,
    name: "NHAI Tax Free Bond",
    category: "SOVEREIGN",
    subCategory: "Infrastructure",
    price: 1150.20,
    coupon: "6.80%",
    maturity: "2031",
    returns: { '1Y': 6.80, '3Y': 6.75 },
    risk: "Low",
    minInvestment: 5000,
    description: "Tax-free interest income from National Highways Authority of India"
  }
];
