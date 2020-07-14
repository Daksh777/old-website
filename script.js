window.addEventListener("load", event => {
  var discord = document.getElementsByClassName("n05")[0];
  var discordLabel = document.querySelectorAll(".n05 .label")[0];
  discord.addEventListener("click", showDiscordDetails, false);

  function showDiscordDetails() {
    discord.classList.add("discordClick");
    discordLabel.classList.add("discordClick");
    hideOnClickOutside(discord);
  }

  function hideOnClickOutside(element) {
    const outsideClickListener = event => {
      if (!element.contains(event.target) && isVisible(element)) {
        discordLabel.classList.remove("discordClick");
        discord.classList.remove("discordClick");
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener("click", outsideClickListener);
    };
    document.addEventListener("click", outsideClickListener);
  }

  const isVisible = elem =>
    !!elem &&
    !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
});
