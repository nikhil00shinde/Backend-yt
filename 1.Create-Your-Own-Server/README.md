## Server

- Website server ke thorugh powered hoti hain
- Server have 2 part
  - **Software** -> jo ki HTTP protocal (request and response cycle ko handle karta hain)
  - **Hardware** -> jisme hum apna data save karte hain

---

## Website ko server se power karte hain toh uske kya jayde hote hain

- Efficient storage and delivery of information (Dynamic website bnana ke liye server chahiye)
- Customized user experience (credit card save ,suggestion) (save data in hardware)
- Controlled access to content
- Notification and communication

---

## HTTP -> Hypertext transfer protocal

- Humhe hamara HTML files ek jagah se, yani kaha se server se browser pe leke aani hain toh uska kuch tareka hota, uske kuch niyam hain jo humhe follow karne padhte hain, toh unhi rules & regulation ko unni Niyomo ko kahete hain HTTP

## HTML -> Hypertext markup langauge

---

- IP address - jo bhi computer internet se connect hoga na uska ek UNIQUE IP ADDRESS hoga
- humhe apne system se koi website host ki hain (google.com), toh aap mujhe jab bhi bhi google.com chahiye hogi na toh mera server es IP address ko doondega
- har website ka unique IP address hota hain, kyuki woh har alag alag host pe hosted hoti hain

---

## Kyu nodejs se server nahi bnate?

- Humne sikha ki nodejs ke through server kaise bnate
- But nodejs se server bnana jyada preferable nhi hota kyuki
  - jab routing complex hoti and HTTP method use karte(GET,POST,DELETE,PUT) to code complex and bada ho jata toh debug karne mei problem aati hain
  - toh hum 3rd party framework use karte hain express
