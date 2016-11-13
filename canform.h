#ifndef CANFORM_H
#define CANFORM_H

#include <QWidget>

namespace Ui {
class CanForm;
}

class CanForm : public QWidget
{
    Q_OBJECT

public:
    explicit CanForm(QWidget *parent = 0);
    ~CanForm();

private:
    Ui::CanForm *ui;
};

#endif // CANFORM_H
