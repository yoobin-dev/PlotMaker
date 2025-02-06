package org.ohap.plotmaker.config;

import java.text.SimpleDateFormat;

import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.CoreConstants;
import ch.qos.logback.core.LayoutBase;

public class LogbackLayout extends LayoutBase<ILoggingEvent> {

  @Override
  public String doLayout(ILoggingEvent event) {
    StringBuffer sbuf = new StringBuffer();
		sbuf.append("[");
		sbuf.append(new SimpleDateFormat("yy/MM/dd_HH:mm:ss").format(event.getTimeStamp()));
		sbuf.append("][");
    sbuf.append(String.format("%-5s", event.getLevel()));
    sbuf.append("][");
    // sbuf.append(String.format("%-15.15s", event.getThreadName()));
    sbuf.append(event.getThreadName());
    sbuf.append("] ");
    // sbuf.append(String.format("%-30.30s", event.getLoggerName()));
    sbuf.append(event.getLoggerName());
    if(event.getLoggerName().equals("jdbc.sqlonly")) {
    sbuf.append(CoreConstants.LINE_SEPARATOR + "    ");
    } else {
      sbuf.append(" - ");
    }
    sbuf.append(event.getFormattedMessage());
    sbuf.append(CoreConstants.LINE_SEPARATOR);
    return sbuf.toString();
  }
  
}
