FROM php:8.2-apache
COPY . /var/www/html/
RUN a2enmod headers \
    && printf '%s\n' \
        '<FilesMatch "\.(html|css|js)$">' \
        '    Header set Cache-Control "no-cache, must-revalidate"' \
        '</FilesMatch>' \
        > /etc/apache2/conf-available/cache-control.conf \
    && a2enconf cache-control
EXPOSE 80