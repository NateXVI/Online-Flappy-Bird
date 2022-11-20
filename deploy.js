import fs from 'fs';
import ghpages from 'gh-pages';

if (!fs.existsSync('build')) {
	throw new Error('build folder does not exist. Please run `npm run build` first.');
}
fs.copyFileSync('CNAME', 'build/CNAME');
fs.copyFileSync('.nojekyll', 'build/.nojekyll');
ghpages.publish('build', {
	src: ['**/*', 'CNAME', '.nojekyll']
});
console.log('Deployed to GitHub Pages');
