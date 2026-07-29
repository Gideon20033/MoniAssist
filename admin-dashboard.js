<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>MoniAssist Admin Dashboard</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">

<style>

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:Arial,sans-serif;
}

body{
background:#f4f7fb;
}

header{
background:linear-gradient(135deg,#0057ff,#00b4ff);
color:white;
padding:20px;
text-align:center;
box-shadow:0 4px 10px rgba(0,0,0,.15);
}

header h2{
margin-bottom:5px;
}

.container{
width:92%;
max-width:1100px;
margin:20px auto;
}

.stats{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
gap:15px;
margin-bottom:25px;
}

.stat-card{
background:white;
padding:20px;
border-radius:15px;
text-align:center;
box-shadow:0 4px 12px rgba(0,0,0,.08);
}

.stat-card i{
font-size:30px;
color:#0057ff;
margin-bottom:10px;
}

.stat-card h2{
color:#0057ff;
margin:10px 0;
}

.menu{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(180px,1fr));
gap:15px;
}

.card{
background:white;
padding:25px;
border-radius:15px;
text-align:center;
box-shadow:0 4px 12px rgba(0,0,0,.08);
transition:.3s;
}

.card:hover{
transform:translateY(-4px);
}

.card i{
font-size:35px;
color:#0057ff;
margin-bottom:10px;
}

.card a{
text-decoration:none;
color:#222;
font-weight:bold;
display:block;
margin-top:10px;
}

.logout i,
.logout a{
color:red;
}

footer{
text-align:center;
padding:20px;
color:#777;
font-size:14px;
margin-top:30px;
}

</style>

</head>

<body>

<header>
<h2>MoniAssist Admin Dashboard</h2>
<p>Secure Administrator Control Panel</p>
</header>

<div class="container">

<div class="stats">

<div class="stat-card">
<i class="fas fa-users"></i>
<h2 id="totalUsers">0</h2>
<p>Total Users</p>
</div>

<div class="stat-card">
<i class="fas fa-wallet"></i>
<h2 id="totalDeposits">₦0</h2>
<p>Total Deposits</p>
</div>

<div class="stat-card">
<i class="fas fa-money-check-dollar"></i>
<h2 id="pendingWithdrawals">0</h2>
<p>Pending Withdrawals</p>
</div>

<div class="stat-card">
<i class="fas fa-chart-line"></i>
<h2 id="activeInvestments">0</h2>
<p>Active Investments</p>
</div>

</div>

<div class="menu">

<div class="card">
<i class="fas fa-users"></i>
<a href="admin-users.html">Manage Users</a>
</div>

<div class="card">
<i class="fas fa-arrow-down"></i>
<a href="admin-deposits.html">Manage Deposits</a>
</div>

<div class="card">
<i class="fas fa-arrow-up"></i>
<a href="admin-withdrawals.html">Manage Withdrawals</a>
</div>

<div class="card">
<i class="fas fa-chart-line"></i>
<a href="admin-investments.html">Investments</a>
</div>

<div class="card">
<i class="fas fa-receipt"></i>
<a href="admin-transactions.html">Transactions</a>
</div>

<div class="card">
<i class="fas fa-wallet"></i>
<a href="admin-wallet.html">Wallet & Finance</a>
</div>

<div class="card">
<i class="fas fa-gear"></i>
<a href="admin-settings.html">Settings</a>
</div>

<div class="card logout">
<i class="fas fa-right-from-bracket"></i>
<a href="#" id="logoutBtn">Logout</a>
</div>

</div>

</div>

<footer>
© 2026 MoniAssist Admin Panel
</footer>

<script type="module" src="admin-dashboard.js"></script>

</body>
</html>
