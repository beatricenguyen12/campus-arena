## How external sharing works (step by step, beginner-friendly)

1) **Each question gets a URL**  
   We use a path like `/talks/<questionId>`. Example: `/talks/q-123`.

2) **The router reads the URL**  
   When the app loads on `/talks/q-123`, we read `questionId` from the address bar (using the router). If it exists in our data, we show the Question Detail screen for that ID.

3) **If the question is missing**  
   If the ID in the URL isn’t found, we show a simple “Question not found” message instead of breaking.

4) **Share button builds a link**  
   The share handler creates a link for the question: `https://your-site.com/talks/<questionId>`. It tries `navigator.share` (mobile-friendly). If that isn’t available, it copies the link text to the clipboard.

5) **Opening the link**  
   When someone clicks or pastes that link in their browser, the app reads the ID, loads that question, and shows the detail view directly. No extra clicks are needed.

6) **Behavior inside the app**  
   Clicking a question in the list also updates the URL to `/talks/<questionId>` so the address bar always points to the thing you’re viewing, which keeps sharing consistent. The detail screen now has a Share button too; it uses the same link logic, so sharing from detail or from the list works the same.
