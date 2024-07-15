export function userGreeting(offset = 1) { 
    const currentHour = new Date().getUTCHours() + offset;
  
    if (currentHour < 12) {
      return "Good morning";
    } else if (currentHour < 18) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  }