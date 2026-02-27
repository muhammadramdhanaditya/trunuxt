<template>
  <div style="padding: 20px">
    <h1 style="color: #ff9800">👤 Profile - Nuxt.js</h1>
    <p>User profile page migrated to Nuxt</p>

    <div
      style="
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        max-width: 500px;
        margin: 20px 0;
      "
    >
      <div style="text-align: center">
        <div
          style="
            width: 100px;
            height: 100px;
            background: #e0e0e0;
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
          "
        >
          👤
        </div>
        <h2>User Name</h2>
        <p>user@example.com</p>
      </div>

      <div style="margin-top: 20px">
        <div
          style="
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          "
        >
          <span>Member Since</span>
          <span>2024</span>
        </div>
        <div
          style="
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
          "
        >
          <span>Last Login</span>
          <span>Today</span>
        </div>
      </div>
    </div>

    <div style="margin-top: 20px">
      <a
        href="/test"
        style="
          margin-right: 10px;
          padding: 10px 15px;
          background: #2196f3;
          color: white;
          text-decoration: none;
          border-radius: 4px;
        "
      >
        ← Back to Test
      </a>
    </div>
  </div>
</template>
