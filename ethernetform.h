#ifndef ETHERNETFORM_H
#define ETHERNETFORM_H

#include <QWidget>

namespace Ui {
class EthernetForm;
}

class EthernetForm : public QWidget
{
    Q_OBJECT

public:
    explicit EthernetForm(QWidget *parent = 0);
    ~EthernetForm();

private:
    Ui::EthernetForm *ui;
};

#endif // ETHERNETFORM_H
