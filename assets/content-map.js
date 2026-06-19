// assets/content-map.js
// 站点内容分区、关键词标签与搜索过滤函数

const siteConfig = {
  baseUrl: "https://leyusports-main.com.cn",
  siteName: "乐鱼体育",
  defaultLang: "zh-CN"
};

const contentSections = [
  {
    id: "news",
    title: "新闻资讯",
    tags: ["乐鱼体育", "赛事新闻", "体育动态"],
    items: [
      { title: "乐鱼体育签约新赞助商", date: "2025-03-01" },
      { title: "NBA季后赛赛程更新", date: "2025-02-28" }
    ]
  },
  {
    id: "live",
    title: "直播中心",
    tags: ["乐鱼体育", "直播", "体育赛事"],
    items: [
      { title: "英超联赛直播", date: "2025-03-05" },
      { title: "CBA总决赛直播", date: "2025-03-10" }
    ]
  },
  {
    id: "video",
    title: "精彩视频",
    tags: ["乐鱼体育", "集锦", "回放"],
    items: [
      { title: "欧冠进球集锦", date: "2025-02-20" },
      { title: "F1精彩瞬间", date: "2025-02-15" }
    ]
  },
  {
    id: "community",
    title: "社区论坛",
    tags: ["乐鱼体育", "讨论", "球迷互动"],
    items: [
      { title: "最佳球员评选", date: "2025-03-02" },
      { title: "转会传闻讨论", date: "2025-03-03" }
    ]
  },
  {
    id: "shop",
    title: "商城",
    tags: ["乐鱼体育", "装备", "周边"],
    items: [
      { title: "乐鱼体育限量球衣", date: "2025-03-01" },
      { title: "智能运动手环", date: "2025-02-25" }
    ]
  }
];

/**
 * 根据关键词搜索内容分区和条目
 * @param {string} keyword - 搜索关键词
 * @returns {Array} 匹配的结果列表
 */
function searchContent(keyword) {
  if (!keyword || keyword.trim() === "") {
    return [];
  }

  const results = [];
  const lowerKeyword = keyword.toLowerCase();

  contentSections.forEach(section => {
    // 搜索分区标题和标签
    const sectionMatch =
      section.title.toLowerCase().includes(lowerKeyword) ||
      section.tags.some(tag => tag.toLowerCase().includes(lowerKeyword));

    if (sectionMatch) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matchType: "section",
        matchedItems: section.items
      });
    }

    // 搜索条目标题
    const matchedItems = section.items.filter(item =>
      item.title.toLowerCase().includes(lowerKeyword)
    );

    if (matchedItems.length > 0) {
      results.push({
        sectionId: section.id,
        sectionTitle: section.title,
        matchType: "item",
        matchedItems: matchedItems
      });
    }
  });

  return results;
}

/**
 * 获取所有内容分区的标签（去重）
 * @returns {string[]} 去重后的标签列表
 */
function getAllTags() {
  const tagSet = new Set();
  contentSections.forEach(section => {
    section.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet);
}

/**
 * 根据标签筛选内容分区
 * @param {string} tag - 标签名称
 * @returns {Array} 匹配的分区列表
 */
function filterByTag(tag) {
  if (!tag || tag.trim() === "") {
    return [];
  }
  return contentSections.filter(section =>
    section.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

/**
 * 生成站点导航数据（可被其他模块使用）
 * @returns {Object} 导航数据结构
 */
function getNavigation() {
  return contentSections.map(section => ({
    id: section.id,
    title: section.title,
    tags: section.tags,
    url: `${siteConfig.baseUrl}/${section.id}`
  }));
}

// 示例：导出供其他模块使用（如果环境支持模块）
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    siteConfig,
    contentSections,
    searchContent,
    getAllTags,
    filterByTag,
    getNavigation
  };
}