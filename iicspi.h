#ifndef IICSPI_H
#define IICSPI_H

#include <QWidget>

namespace Ui {
class IICSPI;
}

class IICSPI : public QWidget
{
    Q_OBJECT

public:
    explicit IICSPI(QWidget *parent = 0);
    ~IICSPI();

private:
    Ui::IICSPI *ui;
};

#endif // IICSPI_H
