const https = require('https');

async function testProductionAPI() {
  console.log('🔍 Test de l\'API de production...');
  
  const testData = {
    email: 'test-production@example.com',
    password: 'test123456',
    name: 'Test Production User',
    username: 'testproduser',
    sport: 'Running'
  };

  const postData = JSON.stringify(testData);
  
  const options = {
    hostname: 'athlink.fr',
    port: 443,
    path: '/api/auth/signup',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = https.request(options, (res) => {
    console.log(`📊 Status: ${res.statusCode}`);
    console.log(`📋 Headers:`, res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('📄 Response Body:', data);
      
      if (res.statusCode === 201) {
        console.log('✅ Inscription réussie !');
      } else if (res.statusCode === 500) {
        console.log('❌ Erreur 500 - Problème serveur');
      } else if (res.statusCode === 400) {
        console.log('⚠️ Erreur 400 - Données invalides');
      } else {
        console.log(`⚠️ Status inattendu: ${res.statusCode}`);
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Erreur de requête:', e.message);
  });

  req.write(postData);
  req.end();
}

testProductionAPI();
