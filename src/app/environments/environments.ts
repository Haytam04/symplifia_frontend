

export const environment = {
    production: false,
    apiUrls: {
      dashboard: 'http://localhost:8080/api/dashboard', 
      syndic: 'http://localhost:8080/api/syndics/',
      residents: 'http://localhost:8080/api/residents',
      confirmPayment: 'http://localhost:8080/api/invoices/confirm-payment',  

      payment: 'http://localhost:8080/api/invoices',
      paymentDetails: 'http://localhost:8080/api/payment/details',
      auth: 'http://localhost:8080/api/auth/',
      syndics: 'http://localhost:8080/syndics',
      buildings: 'http://localhost:8080/api/syndics',
    }
  };