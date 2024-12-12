import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

const OrderAnalyticsCharts = ({ orders }) => {
  // Memoize data processing to avoid unnecessary recalculations
  const processedData = useMemo(() => {
    // Product Distribution
    const productDistribution = orders.reduce((acc, item) => {
      const productName = item.order.productName;
      acc[productName] = (acc[productName] || 0) + 1;
      return acc;
    }, {});

    // Price Distribution
    const priceDistribution = orders.reduce((acc, item) => {
      const price = item.order.price;
      const category = price < 200 ? 'Low (< ₹200)' 
        : price < 500 ? 'Medium (₹200-₹500)' 
        : 'High (> ₹500)';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Order by Month
    const ordersByMonth = orders.reduce((acc, item) => {
      const month = new Date(item.order.orderDate).toLocaleString('default', { month: 'short' });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // Quantity Distribution
    const quantityDistribution = orders.reduce((acc, item) => {
      const qty = item.order.qty;
      acc[qty] = (acc[qty] || 0) + 1;
      return acc;
    }, {});

    return {
      productDistribution: Object.entries(productDistribution).map(([name, value]) => ({ name, value })),
      priceDistribution: Object.entries(priceDistribution).map(([name, value]) => ({ name, value })),
      ordersByMonth: Object.entries(ordersByMonth).map(([name, value]) => ({ name, value })),
      quantityDistribution: Object.entries(quantityDistribution).map(([name, value]) => ({ name, value }))
    };
  }, [orders]);

  // Color palette
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Product Distribution Pie Chart */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Product Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={processedData.productDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {processedData.productDistribution.map((entry, index) => (
                <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Price Distribution Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Price Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData.priceDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d">
              {processedData.priceDistribution.map((entry, index) => (
                <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Orders by Month Bar Chart */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Monthly Order Volume</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData.ordersByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8">
              {processedData.ordersByMonth.map((entry, index) => (
                <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quantity Distribution Pie Chart */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">Quantity Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={processedData.quantityDistribution}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {processedData.quantityDistribution.map((entry, index) => (
                <Cell key={`cell-₹{index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default OrderAnalyticsCharts;