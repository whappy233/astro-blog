import justifiedLayout from 'justified-layout';
import GLightbox from 'glightbox';

interface JustifiedLayoutResult {
	/**
	 * 包含对齐布局的容器的高度.
	 */
	containerHeight: number;
	/**
	 * 未完全包装的行中的物料数.
	 */
	widowCount: number;
	/**
	 * 计算的对齐布局中盒子的位置和大小属性.
	 */
	boxes: LayoutBox[];
}

/**
 * 布局中盒子的计算位置和大小属性.
 */
interface LayoutBox {
	/**
	 * 盒子的纵横比.
	 */
	aspectRatio: number;
	/**
	 * 框的顶部与对齐布局的顶部边界之间的距离.
	 */
	top: number;
	/**
	 * 对齐布局中框的宽度.
	 */
	width: number;
	/**
	 * Height of the box in a justified layout.
	 */
	height: number;
	/**
	 * 框的左侧与对齐布局的左侧边界之间的距离.
	 */
	left: number;
	/**
	 * 纵横比是否强制.
	 */
	forcedAspectRatio?: boolean;
}

export async function setupGallery() {
	if (typeof document === 'undefined') return;

	const container = document.getElementById('photo-grid');
	if (!container) {
		console.error('Photo grid container not found.');
		return;
	}

	const imageLinks = Array.from(container.querySelectorAll('.photo-item')) as HTMLElement[];

	if (imageLinks.length === 0) {
		console.warn('No images found inside the photo grid.');
		return;
	}

	// Wait for all images to load
	const imageElements = await waitForImagesToLoad(container);

	// Get actual image dimensions after loading
	const layout = createLayoutFor(imageElements, container);
	console.log('Generated layout:', layout);

	applyImagesStyleBasedOnLayout(imageLinks, layout);
	applyContainerStyleBasedOnLayout(container, layout);

	// Initialize GLightbox
	GLightbox({
		selector: '.glightbox',
		openEffect: 'zoom',
		closeEffect: 'fade',
		width: 'auto',
		height: 'auto',
	});
}

function createLayoutFor(
	imageElements: HTMLImageElement[],
	container: HTMLElement,
): JustifiedLayoutResult {
	const imageSizes = imageElements.map((img) => ({
		width: img.naturalWidth || img.width || 300,
		height: img.naturalHeight || img.height || 200,
	}));

	const layout = justifiedLayout(imageSizes, {
		containerWidth: container.clientWidth || window.innerWidth,
		targetRowHeight: 300,
		boxSpacing: 10,
		containerPadding: 0,
	});
	return layout;
}

async function waitForImagesToLoad(container: HTMLElement) {
	const imageElements = Array.from(container.querySelectorAll('img')) as HTMLImageElement[];

	await Promise.all(
		imageElements.map(
			(img) =>
				new Promise((resolve) => {
					if (img.complete) {
						resolve(null);
					} else {
						img.onload = () => resolve(null);
						img.onerror = () => resolve(null);
					}
				}),
		),
	);
	return imageElements;
}

function applyImagesStyleBasedOnLayout(imageLinks: HTMLElement[], layout: JustifiedLayoutResult) {
	imageLinks.forEach((el, i) => {
		if (!layout.boxes[i]) return;
		const { left, top, width, height } = layout.boxes[i];

		el.style.position = 'absolute';
		el.style.left = `${left}px`;
		el.style.top = `${top}px`;
		el.style.width = `${width}px`;
		el.style.height = `${height}px`;
		el.style.display = 'block';
	});
}

function applyContainerStyleBasedOnLayout(container: HTMLElement, layout: JustifiedLayoutResult) {
	// 确保父容器具有相对定位
	container.style.position = 'relative';
	// 设置容器高度
	container.style.height = `${layout.containerHeight}px`;
}
// 加载页面后运行 setupGallery
if (typeof window !== 'undefined') {

	const debouncedSetup = debounce(setupGallery, 250);

	document.addEventListener('astro:page-load', setupGallery);
	// document.addEventListener('DOMContentLoaded', setupGallery);
	window.addEventListener('resize', debouncedSetup);
}

// 去抖动助手
function debounce<T extends (...args: unknown[]) => unknown>(func: T, wait: number) {
	let timeout: ReturnType<typeof setTimeout>;
	return function executedFunction(...args: Parameters<T>) {
		const later = () => {
			clearTimeout(timeout);
			func(...args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}
