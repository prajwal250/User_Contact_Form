const firebase = window.firebase;
firebase.initializeApp({
    apiKey: 'AIzaSyDY453ohxvPoizc0BUngVbqblVGAAfsX4Q',
    authDomain: 'mrindia-0.firebaseapp.com',
    databaseURL: 'https://mrindia-0-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'mrindia-0',
    storageBucket: 'mrindia-0.firebasestorage.app',
    messagingSenderId: '829263357469',
    appId: '1:829263357469:web:56e8ff92e299edee83c8f4',
    measurementId: 'G-DM9KX3VTTH'
});
function formatCustomDate(dateObj, is_file_name) {
    const padtft = ntp => ntp.toString().padStart(2, '0');
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dateObj.getDay()];
    const day = padtft(dateObj.getDate());
    const month = padtft(dateObj.getMonth() + 1);
    const year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    const minutes = padtft(dateObj.getMinutes());
    const seconds = padtft(dateObj.getSeconds());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedHours = padtft(hours);
    if (is_file_name) return `Date - ${day}_${month}_${year}, ${weekday}, Time - ${formattedHours}_${minutes}_${seconds} ${ampm}`;
    return `${day}/${month}/${year}, ${weekday}, ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}
document.getElementById('User_Contact_Form').onsubmit = async ufose => {
    ufose.preventDefault();
    try {
        const now = new Date();
        const newUserData = {
            "User's Name": document.getElementById('User_Name').value,
            "User's Email Address": document.getElementById('User_Email').value,
            'Website Concerned': document.getElementById('User_Form_Website').value,
            'Message Category': document.getElementById('User_Message_Type').value,
            'Complete User Message': document.getElementById('User_Complete_Message').value,
            'User Feedback Submitted From': window.location.href,
            'User Feedback Submitted On': formatCustomDate(now)
        };
        await firebase.firestore().collection('User_Contact_Desk').doc('User_Reports').set({ [`User_${now.getTime()}`]: newUserData }, { merge: true });
        const url = URL.createObjectURL(new Blob([JSON.stringify(newUserData, null, 4)], { type: 'application/json' })), a = document.createElement('a');
        a.href = url; a.download = `${(window.location.host + window.location.pathname).replace(/\/+$/, '').replace(/\//g, '_')}, ${newUserData["User's Name"].replace(/[\\/:*?"<>|]/g, '_')}, On ${formatCustomDate(now, 1)}.json`;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(() => {
            URL.revokeObjectURL(url);
            window.location.href = 'Thank_You.html';
        }, 1000);
    }
    catch (err) { alert(`Error saving user feedback : ${err}! Please try again later!`); }
};