package org.ohap.plotmaker.util;

import org.springframework.stereotype.Component;

@Component
public class MakeHtmlUtil {
  
  public String makePlotHtml(
    String category, String genre, String timeframe, String theme,
    String event, String tellType, String custom, String title, String plotContent
  ){
    StringBuilder sb = new StringBuilder();
    sb.append("<html>")
      .append("<body>")
      .append(category).append("<br>")
      .append(genre).append("<br>")
      .append(timeframe).append("<br>")
      .append(theme).append("<br>")
      .append(event).append("<br>")
      .append(tellType).append("<br>")
      .append(custom).append("<br>")
      .append(title).append("<br>")
      .append(plotContent).append("<br>")
      .append("</body>")
      .append("</html>");
    
      return sb.toString();
  }

}
