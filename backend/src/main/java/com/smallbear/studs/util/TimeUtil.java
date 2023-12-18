package com.smallbear.studs.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeUtil {
    private final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    public String formatTime(Date date) {
        return dateFormat.format(date);
    }

    public Date parseTime(String dateString) throws ParseException {
        return dateFormat.parse(dateString);
    }
}
