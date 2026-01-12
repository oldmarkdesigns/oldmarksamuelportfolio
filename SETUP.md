# Setup Instructions

## Asset Setup

The portfolio uses images from the `Portfolio Assets` folder. For Next.js to serve these assets correctly, you have two options:

### Option 1: Symlink (Recommended)
Create a symlink from public to the Portfolio Assets folder:
```bash
cd public
ln -s ../Portfolio\ Assets Portfolio\ Assets
```

### Option 2: Copy Assets
Copy the Portfolio Assets folder into the public directory:
```bash
cp -r "Portfolio Assets" public/
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up assets (choose one option above)

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

## Notes

- All images are referenced from `/Portfolio Assets/...` path
- Make sure the Portfolio Assets folder is accessible in the public directory
- The site is fully responsive and optimized for all devices

