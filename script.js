
document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const resultCount = document.getElementById("resultCount");

  const cards = document.querySelectorAll(".card");
  const sections = document.querySelectorAll(".certificate-section");

  function filterCertificates() {

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    let visibleCards = 0;

    cards.forEach((card) => {

      const title = card.querySelector("h3").textContent.toLowerCase();
      const description = card.textContent.toLowerCase();
      const category = card.dataset.category;

      const matchesSearch =
        title.includes(searchText) ||
        description.includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        category === selectedCategory;

      const shouldDisplay = matchesSearch && matchesCategory;

      card.style.display = shouldDisplay ? "" : "none";

      if (shouldDisplay) {
        visibleCards++;
      }

    });

    // Hide sections without matching cards
    sections.forEach((section) => {

      const sectionCards = section.querySelectorAll(".card");

      const hasVisibleCards = Array.from(sectionCards).some(
        (card) => card.style.display !== "none"
      );

      section.style.display = hasVisibleCards ? "" : "none";

    });

    // Update result count
    resultCount.textContent =
      visibleCards === 0
        ? "No certificates or badges found."
        : `Showing ${visibleCards} achievement${visibleCards !== 1 ? "s" : ""}`;

  }

  searchInput.addEventListener("input", filterCertificates);

  categoryFilter.addEventListener("change", filterCertificates);

  // Initial count
  filterCertificates();

});
